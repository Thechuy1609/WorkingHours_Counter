class Session < ApplicationRecord
  belongs_to :job
  validates_presence_of :profit
  validates_presence_of :hours




  
end
