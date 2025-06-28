/*
  # 访问统计系统

  1. 新建表
    - `site_stats` - 网站总体统计
    - `daily_visits` - 每日访问统计  
    - `visit_logs` - 访问日志（可选）

  2. 安全
    - 启用 RLS
    - 添加公开读取策略
    - 添加服务端写入策略
*/

-- 网站总体统计表
CREATE TABLE IF NOT EXISTS site_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  total_visits INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 插入初始数据（从0开始）
INSERT INTO site_stats (id, total_visits) VALUES (1, 0)
ON CONFLICT (id) DO NOTHING;

-- 每日访问统计表
CREATE TABLE IF NOT EXISTS daily_visits (
  id SERIAL PRIMARY KEY,
  visit_date TEXT UNIQUE NOT NULL,
  visit_count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 访问日志表（可选，用于详细分析）
CREATE TABLE IF NOT EXISTS visit_logs (
  id SERIAL PRIMARY KEY,
  visit_date TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 启用 RLS
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE visit_logs ENABLE ROW LEVEL SECURITY;

-- 公开读取策略
CREATE POLICY "Anyone can read site stats"
  ON site_stats
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read daily visits"
  ON daily_visits
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 服务端写入策略
CREATE POLICY "Service role can update site stats"
  ON site_stats
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can manage daily visits"
  ON daily_visits
  FOR ALL
  TO service_role
  USING (true);

CREATE POLICY "Service role can insert visit logs"
  ON visit_logs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 创建增加总访问量的函数
CREATE OR REPLACE FUNCTION increment_total_visits()
RETURNS INTEGER AS $$
DECLARE
  new_total INTEGER;
BEGIN
  UPDATE site_stats 
  SET total_visits = total_visits + 1, updated_at = now()
  WHERE id = 1
  RETURNING total_visits INTO new_total;
  
  RETURN new_total;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建或更新每日访问量的函数
CREATE OR REPLACE FUNCTION upsert_daily_visit(visit_date_param TEXT)
RETURNS INTEGER AS $$
DECLARE
  current_count INTEGER;
BEGIN
  INSERT INTO daily_visits (visit_date, visit_count)
  VALUES (visit_date_param, 1)
  ON CONFLICT (visit_date)
  DO UPDATE SET 
    visit_count = daily_visits.visit_count + 1,
    updated_at = now()
  RETURNING visit_count INTO current_count;
  
  RETURN current_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;