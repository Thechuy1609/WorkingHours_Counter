class WorksController < ApplicationController
  def create
    if user_signed_in?
    @work = current_user.works.build(work_params)
    else
      @work = Work.new(work_params)
    end
    if @work.save
      if user_signed_in?
      flash[:success] = 'Session successfully saved'
      redirect_to jobs_path(current_user)
      else
      redirect_to work_path(@work)
      end
    else
      flash[:error] = "Something went wrong", @work.errors.full_messages
      redirect_to root_path
    end
  end

  def index
    @work = Work.new
  end

  def show
    @work = Work.find(params[:id])
  end

  def destroy
    @work = Work.find(params[:id])
    @work.destroy
      redirect_to jobs_path(current_user)
  end

  private
 def work_params
  params.require(:work).permit(:profit, :hours, :salary, :time)
 end
end
