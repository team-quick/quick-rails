# frozen_string_literal: true

$redis = Redis::Namespace.new('paint', redis: Redis.new)
