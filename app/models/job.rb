class Job < ApplicationRecord
  validates :name, presence: true
  has_many :sessions



  
end
