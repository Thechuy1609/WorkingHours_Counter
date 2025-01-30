class InvoicesController < ApplicationController
  before_action :set_project
  def index
   @invoice = Invoice.all
  end

  def new
    @invoice = @project.invoices.build
    @works = @project.works.all
  end

  def create
    @invoice = @project.invoices.build(invoice_params)

    if @invoice.save
      redirect_to @invoice, notice: "invoice successfully created!"
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def invoice_params
    params.require(:invoice).permit()
  end
end
