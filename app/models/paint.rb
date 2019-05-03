# frozen_string_literal: true

class Paint
  class << self
    def redis
      $redis
    end

    def put(session, path)
      redis.rpush(session, path)
    end

    def load(session)
      redis.lrange(session, 0, -1)
    end

    def toFile(session)
      redis.ltrim(session, 0, -1)
    end
  end
end
