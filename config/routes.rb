Rails.application.routes.draw do
  root 'home#index'

  resource :users, only: [:create]
  post "/login", to: "sessions#login"
  get "/auto_login", to: "sessions#auto_login"

  get '*path', to: 'home#index', via: :all

end
