class ProjectsController < ApplicationController
  def new
    @project = Project.new
  end
  def create
    @project = current_user.projects.build(project_params)
    if @project.save
      flash[:success] = "Project successfully created"
      redirect_to projects_path(current_user)
    else
      flash[:error] = "Something went wrong", @project.errors.full_messages
      redirect_to root_path
    end
  end
  def index
    @projects = current_user.projects.all
  end

  def show
    @project = Project.find(params[:id])
    @works = @project.works.all
  end
  def destroy
    @project = Project.find(params[:id])
    @project.destroy
      redirect_to projects_path(current_user)
  end

  private
  def project_params
   params.require(:project).permit(:name, :description, :client)
  end
end
