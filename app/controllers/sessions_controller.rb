class SessionsController < ApplicationController
  def create
    @session = Session.new(session_params)
    if @session.save
      flash[:success] = 'Session successfully saved'
      redirect_to session_path(@session)
    else
      flash[:error] = "Something went wrong", @session.errors.full_messages
      redirect_to root_path
    end
  end

  def index
    @session = Session.new
  end

  def show
    @session = Session.find(params[:id])
    @session = Session.all
  end

  def destroy
    @session = Session.find(params[:id])
    @session.destroy
      redirect_to root_path
  end

  private
 def session_params
  params.require(:work_session).permit(:profit, :hours, :salary, :time)
 end
end
