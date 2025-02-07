class InvoicesController < ApplicationController
  before_action :set_project

  def index
    @invoices = @project.invoices
  end

  def create
    Rails.logger.debug "Params received: #{params.inspect}"
    @invoice = Invoice.new(invoice_params)

    if @invoice.save
      redirect_to project_invoice_path(@invoice.project_id, @invoice.id)
    else
      flash[:error] = "Something went wrong", @invoice.errors.full_messages
      redirect_to new_project_invoice_path
    end
  end

  def new
    @invoice = Invoice.new

    @works = @project.works.includes(:commits)
    @commits = @works.flat_map(&:commits)

    if @works.present?
      description = @commits.map(&:description).join("\n")

      generated_line_item = @invoice.line_items.new description: description, rate: @works.last.salary.to_d, quantity: @works.last.calculated_time, subtotal: (@works.last.calculated_time * @works.last.salary.to_d).round(2)
      @invoice.total = generated_line_item.subtotal
    end
  end

  def show
    @invoice = Invoice.find(params[:id])
    @project = @invoice.project
  end


  def destroy
    @invoice = @project.invoices.find(params[:id]) # Scoped lookup to avoid issues
  
    if @invoice.destroy
      flash[:success] = "Invoice deleted successfully"
    else
      flash[:error] = "Failed to delete invoice"
    end
  
    redirect_to project_invoices_path(@project.id) # Ensure the path is correct
  end
  

  private

  def set_project
    if params[:project_id].present?
      @project = Project.find_by(id: params[:project_id])

    end
  end

  def invoice_params
    params.require(:invoice).permit(:name, :client, :total, :project_id, :date, :due_date,line_items_attributes: [ :description, :quantity, :rate, :subtotal ])
  end
end
