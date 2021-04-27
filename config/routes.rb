Rails.application.routes.draw do
  resource :users, only: [:create]
  post "/login", to: "sessions#login"
  get "/auto_login", to: "sessions#auto_login"
end
