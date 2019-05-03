# frozen_string_literal: true

class PaintChannel < ApplicationCable::Channel
  def subscribed
    stream_from "paint_#{params[:room]}"
    stream_from "paint_user_#{current_user}"
  end

  def unsubscribed; end

  def load
    data = {}
    data['action'] = 'load'
    data['pathes'] = Paint.load("room_#{params[:room]}")
    ActionCable.server.broadcast("paint_user_#{current_user}", data)
  end

  def chat(message)
    logger.debug Paint.load("room_#{params[:room]}")
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
