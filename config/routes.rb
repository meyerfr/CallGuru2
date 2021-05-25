Rails.application.routes.draw do
  devise_for :users, controllers: { invitations: 'users/invitations', sessions: 'users/sessions' }
  root to: 'pages#home'

  get '/playbooks', to: 'pages#home'
  get '/knowledge', to: 'pages#home'
  get '/insights', to: 'pages#home'
  get '/teams', to: 'pages#home'
  get '/settings', to: 'pages#home'
  get '/profile', to: 'pages#home'
  get '/backlog', to: 'pages#home'
  get '/companies/:id', to: 'pages#home'
  get '/playbooks/:id', to: 'pages#home'
  get '/calls/:call_id/playbooks/:playbook_id/sections/:id', to: 'pages#home'
  get '/calls/:call_id/', to: 'pages#home'

  # get '/accept_invite', to: 'pages#home'


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :companies, except: [ :new, :edit, :destroy ] do
        resources :users, only: [ :index, :create ]
        resources :playbooks, only: [ :index, :create ]
      end
      resources :playbooks, only: [ :show ] do
        resources :sections, only: [ :index ]
      end
      resources :calls, only: [ :show, :create, :update ]
    end
  end

  # resources :channels, only: [ :show ]
  # root to: 'channels#show'

  # mount ActionCable.server => "/cable"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
