Rails.application.routes.draw do
  root 'home#index'

  resource :users, only: [:create]
  post 'password/forgot', to: 'passwords#forgot'
  post 'password/reset', to: 'passwords#reset'
  post "/login", to: "sessions#login"
  get "/auto_login", to: "sessions#auto_login"
end
