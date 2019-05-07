# frozen_string_literal: true

class PaintController < ApplicationController
  def new
    @session = PaintSession.new
    print @session
  end

  def create
    @session = PaintSession.new
    # print params[:private]
    # redirect_to '/paint'
  end
end
