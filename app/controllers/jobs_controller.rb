class JobsController < ApplicationController
  def index
    @works = current_user.works.where(project_id: nil)
  end

end
