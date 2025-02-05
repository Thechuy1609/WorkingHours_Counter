class ProjectWorksController < ApplicationController

  def new
    @project = Project.find(params[:project_id])
    @work = @project.works.build
  end

  private
  def work_params
    params.require(:work).permit(:profit, :hours, :time, :salary, :user_id, :project_id)
  end
end
