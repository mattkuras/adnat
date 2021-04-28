Rails.application.routes.draw do
  root 'home#index'

  resource :users, only: [:create]
  post 'password/forgot', to: 'passwords#forgot'
  patch 'password/reset/:id', to: 'passwords#reset'
  post "/login", to: "sessions#login"
  get "/auto_login", to: "sessions#auto_login"
  get "/users/passwords/:id", to: "passwords#page"

  get '*path', to: 'home#index', via: :all

end
