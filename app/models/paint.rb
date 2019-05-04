# frozen_string_literal: true

class Paint
  class << self
    def redis
      $redis
    end

    def put(session, path)
      redis.rpush(session, path)
    end

    def loadPathes(session)
      redis.lrange(session, 0, -1)
    end

    def toFile(session)
      redis.ltrim(session, 0, -1)
    end

    def chat(session, message)
      redis.rpush(session + '#chat', message)
    end

    def loadChat(session)
      redis.lrange(session + '#chat', 0, -1)
    end
  end
end
