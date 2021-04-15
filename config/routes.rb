Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'

  get '/playbooks', to: 'pages#home'
  get '/knowledge', to: 'pages#home'
  get '/insights', to: 'pages#home'
  get '/teams', to: 'pages#home'
  get '/settings', to: 'pages#home'
  get '/profile', to: 'pages#home'
  get '/backlog', to: 'pages#home'
  get '/companies/:id', to: 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :companies, except: [ :new, :edit, :destroy ] do
        resources :users, only: [ :index ]
      end
    end
  end

  # resources :channels, only: [ :show ]
  # root to: 'channels#show'

  # mount ActionCable.server => "/cable"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
