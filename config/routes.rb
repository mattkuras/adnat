Rails.application.routes.draw do
  root 'home#index'

  resource :users, only: [:create]
  resource :organizations, only: [:create, :update, :destroy]
  resource :jobs, only: [:create]

  delete '/organizations/:id', to: 'organizations#destroy'
  get '/organizations', to: 'organizations#index'
  post 'password/forgot', to: 'passwords#forgot'
  patch 'password/reset/:id', to: 'passwords#reset'
  post "/login", to: "sessions#login"
  get "/auto_login", to: "sessions#auto_login"
  get "/users/passwords/:id", to: "passwords#page"
  post "/signup", to: "users#create"

  get '*path', to: 'home#index', via: :all

end
