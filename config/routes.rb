Rails.application.routes.draw do
  root 'main#index'

  get 'gif' => 'gif#index'
end
