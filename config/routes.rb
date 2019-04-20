# frozen_string_literal: true

Rails.application.routes.draw do
  root 'main#index'

  get 'gif' => 'gif#index'
  get 'paint' => 'paint#index'
end
