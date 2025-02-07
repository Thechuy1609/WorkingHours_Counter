class InvoicesController < ApplicationController
  before_action :set_project

  def index
    if params[:project_id].present?
      @project = Project.find_by(id: params[:project_id])
      if @project
        @invoices = @project.invoices
      else
        flash[:error] = "Project not found"
        redirect_to invoices_path
      end
    else
      @invoices = Invoice.all
    end
  end

  def create
    Rails.logger.debug "Params received: #{params.inspect}"
    @invoice = Invoice.new(invoice_params)

    if @invoice.save
      flash[:success] = "Invoice successfully created"
      redirect_to invoice_path(@invoice)
    else
      flash[:error] = "Something went wrong", @invoice.errors.full_messages
      redirect_to new_invoice_path
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
    @invoice = Invoice.find(params[:id])
    @invoice.destroy
    redirect_to invoices_path
  end

  private

  def set_project
    if params[:project_id].present?
      @project = Project.find_by(id: params[:project_id])
      unless @project
        flash[:error] = "Project not found"
        redirect_to invoices_path
      end
    end
  end

  def invoice_params
    params.require(:invoice).permit(:name, :client, :total, :project_id, :date, :due_date,line_items_attributes: [ :description, :quantity, :rate, :subtotal ])
  end
end
