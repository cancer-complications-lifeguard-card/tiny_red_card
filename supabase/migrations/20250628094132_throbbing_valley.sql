/*
  # 重置访问统计系统为零

  1. 更新表数据
    - 重置 `site_stats` 总访问量为 0
    - 清空 `daily_visits` 每日访问统计  
    - 清空 `visit_logs` 访问日志

  2. 安全
    - 保持现有 RLS 策略
    - 确保数据完整性
*/

-- 重置总访问量为0（如果记录存在则更新，不存在则插入）
INSERT INTO site_stats (id, total_visits, updated_at) 
VALUES (1, 0, now())
ON CONFLICT (id) 
DO UPDATE SET 
  total_visits = 0,
  updated_at = now();

-- 清空每日访问统计（重新开始计数）
DELETE FROM daily_visits;

-- 清空访问日志（重新开始记录）
DELETE FROM visit_logs;

-- 重置序列（确保ID从1开始）
ALTER SEQUENCE IF EXISTS daily_visits_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS visit_logs_id_seq RESTART WITH 1;