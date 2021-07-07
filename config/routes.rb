Rails.application.routes.default_url_options[:host] = 'localhost:3000'
Rails.application.routes.draw do
  devise_for :users,
    # defaults: { format: :json },
    # path: '',
    # path_names: {
    #   sign_in: 'api/login',
    #   sign_out: 'api/logout',
    #   registration: 'api/signup'
    # },
    controllers: {
      invitations: 'users/invitations',
      sessions: 'users/sessions'
      # registrations: 'registrations'
    }
  root to: 'pages#home'

  get '/knowledge', to: 'pages#home'
  get '/insights', to: 'pages#home'
  get '/teams', to: 'pages#home'
  get '/settings', to: 'pages#home', as: 'settings'
  get '/settings/company', to: 'pages#home'
  get '/backoffice', to: 'pages#home'
  get '/backoffice/companies', to: 'pages#home'
  get '/backoffice/companies/:id', to: 'pages#home'
  get '/playbooks/:playbook_id', to: 'pages#home'
  get '/playbooks/:playbook_id/sections/:id', to: 'pages#home'
  get '/calls/:call_id/playbooks/:playbook_id/sections/:id', to: 'pages#home'
  get '/calls/:call_id/', to: 'pages#home'

  # get '/accept_invite', to: 'pages#home'


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users, only: [ :show, :update ]
      devise_for :users, :path => '', path_names: {sign_in: "login", sign_out: "logout"},
                                      controllers: {  registrations: "registrations" }
      resources :companies, except: [ :new, :edit, :destroy ] do
        resources :users, only: [ :index, :create ]
        resources :playbooks, only: [ :index, :create ]
      end
      resources :playbooks, only: [ :show ] do
        resources :sections, only: [ :index ]
      end
      resources :calls, only: [ :show, :create, :update ]
      resources :content_types, only: [ :index ]
    end
  end

  # resources :channels, only: [ :show ]
  # root to: 'channels#show'

  # mount ActionCable.server => "/cable"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
