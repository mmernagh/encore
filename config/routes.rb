Rails.application.routes.draw do
  get 'main/home'
  post 'main/create' => 'main#create'
  post 'main/create/:resource/:time' => 'main#create'
  post 'main/create/:resource/:start_time/:end_time' => 'main#create'
  post 'main/down' => 'main#down'
  post 'main/down/:resource/:time' => 'main#down'
  post 'main/down/:resource/:start_time/:end_time' => 'main#down'
end
