class CallsPlaybookSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :description, :status, :first_section_id
  belongs_to :company, serializer: CompanySerializer
  has_many :sections

  def first_section_id
    if self.object.sections.count > 0
      self.object.sections.first.id
    end
  end

  def sections
    puts "instance_options playbook #{instance_options[:call_id]}"
    ActiveModel::Serializer::CollectionSerializer.new(object.sections, serializer: CallsSectionSerializer, call_id: instance_options[:call_id])
  end
end
