class Project < ApplicationRecord
  belongs_to :user
  has_many :works , dependent: :destroy
  validates_presence_of :name, :client
end
