# frozen_string_literal: true

Rails.application.routes.draw do
  root 'main#index'

  mount ActionCable.server => '/cable'

  get 'gif' => 'gif#index'
  get 'paint' => 'paint#index'
end
