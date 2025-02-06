class Work < ApplicationRecord
  validates_presence_of :profit
  validates_presence_of :hours
  validates_presence_of :time
  validates_presence_of :salary
  belongs_to :user, optional: true
  belongs_to :project, optional: true
  belongs_to :invoice, optional: true
  has_many :commits, dependent: :destroy
  accepts_nested_attributes_for :commits, allow_destroy: true

  def calculated_time
    hours, minutes, seconds = time.strip.split(":").map(&:to_i)
    minutes_to_seconds = minutes * 60
    hours_to_seconds = hours * 60 * 60
    total_seconds = minutes_to_seconds + hours_to_seconds
    (total_seconds / 1.hour.to_f).round(2)
  end
end
