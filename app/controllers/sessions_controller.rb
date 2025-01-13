class SessionsController < ApplicationController
  def create
    @session = Session.new(session_params)
    if @session.save
      flash[:success] = 'Session successfully saved'
      redirect_to root_path
    else
      flash[:error] = "Something went wrong", @session.errors.full_messages
      redirect_to root_path
    end
  end

  def index
    @session = Session.new
  end


  private
 def session_params
  params.require(:session).permit(:profit, :hours, :salary, :time)
 end
end
