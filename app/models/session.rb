class Session < ApplicationRecord
  validates_presence_of :profit
  validates_presence_of :hours
  validates_presence_of :time
  validates_presence_of :salary
end
