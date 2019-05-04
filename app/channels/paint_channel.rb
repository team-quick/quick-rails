# frozen_string_literal: true

class PaintChannel < ApplicationCable::Channel
  def subscribed
    stream_from "paint_#{params[:room]}"
    stream_from "paint_user_#{current_user}"

    # join
    ActionCable.server.broadcast("paint_#{params[:room]}", current_user)
  end

  def unsubscribed
    # leave
    ActionCable.server.broadcast("paint_#{params[:room]}", current_user)
  end

  def load
    data = {}
    data['action'] = 'load'
    data['pathes'] = Paint.loadPathes("room_#{params[:room]}")
    data['chat'] = Paint.loadChat("room_#{params[:room]}")
    ActionCable.server.broadcast("paint_user_#{current_user}", data)
  end

  def chat(message)
    logger.debug Paint.chat("room_#{params[:room]}", message['message'])
    ActionCable.server.broadcast("paint_#{params[:room]}", message)
  end

  def draw(path)
    logger.debug Paint.put("room_#{params[:room]}", path['path'].to_json)
    ActionCable.server.broadcast("paint_#{params[:room]}", path)
  end

  def track(point)
    ActionCable.server.broadcast("paint_#{params[:room]}", point)
  end
end
