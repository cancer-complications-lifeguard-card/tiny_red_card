/*
  # 实时在线用户追踪系统

  1. 新建表
    - `online_users` - 在线用户会话追踪

  2. 安全
    - 启用 RLS
    - 添加策略

  3. 功能
    - 心跳机制追踪在线状态
    - 自动清理过期会话
*/

-- 在线用户追踪表
CREATE TABLE IF NOT EXISTS online_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  user_agent text,
  last_seen timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- 启用 RLS
ALTER TABLE online_users ENABLE ROW LEVEL SECURITY;

-- 策略：任何人都可以读取在线用户数量
CREATE POLICY "Anyone can read online users count"
  ON online_users
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 策略：任何人都可以更新自己的心跳
CREATE POLICY "Anyone can manage their session"
  ON online_users
  FOR ALL
  TO anon, authenticated
  USING (true);

-- 创建更新在线状态的函数
CREATE OR REPLACE FUNCTION update_online_status(session_id_param text, user_agent_param text DEFAULT NULL)
RETURNS void AS $$
BEGIN
  INSERT INTO online_users (session_id, user_agent, last_seen)
  VALUES (session_id_param, user_agent_param, now())
  ON CONFLICT (session_id)
  DO UPDATE SET 
    last_seen = now(),
    user_agent = COALESCE(user_agent_param, online_users.user_agent);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建获取在线用户数的函数
CREATE OR REPLACE FUNCTION get_online_users_count()
RETURNS integer AS $$
BEGIN
  -- 清理5分钟前的过期会话
  DELETE FROM online_users 
  WHERE last_seen < now() - interval '5 minutes';
  
  -- 返回当前在线用户数
  RETURN (SELECT count(*) FROM online_users);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建定时清理过期会话的函数
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM online_users 
  WHERE last_seen < now() - interval '5 minutes';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;