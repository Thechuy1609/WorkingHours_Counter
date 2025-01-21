class ProjectWorksController < ApplicationController

  def new
    @project = Project.find(params[:project_id])
    @work = @project.works.build
  end

  def create
    @project =  Project.find(params[:project_id])
    @work = @project.works.build(work_params)

    if @work.save
      redirect_to @project, notice: "Work successfully added!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  private
  def work_params
    params.require(:work).permit(:profit, :hours, :time, :salary, :user_id, :project_id)
  end
end
