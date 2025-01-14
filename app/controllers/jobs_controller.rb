class JobsController < ApplicationController
def index
  @works = current_user.works.all
end

end
