class Invoice < ApplicationRecord
  has_many :works
  belongs_to :project
  belongs_to :user, optional: true
end
