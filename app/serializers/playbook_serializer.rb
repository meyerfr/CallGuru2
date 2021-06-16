class PlaybookSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :description, :status, :duration, :updated_at, :first_section_id
  belongs_to :owner, serializer: UserSerializer
  belongs_to :company, serializer: CompanySerializer
  has_many :sections_attributes, if: :with_playbook_children?
  has_many :tags, serializer: TagSerializer

  def first_section_id
    if self.object.sections.count > 0
      self.object.sections.first.id
    end
  end

  def sections_attributes
    ActiveModel::Serializer::CollectionSerializer.new(object.sections, each_serializer: SectionSerializer)
  end

  def with_playbook_children?
    instance_options[:with_playbook_children]
  end
end
