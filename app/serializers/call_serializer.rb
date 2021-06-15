class CallSerializer < ActiveModel::Serializer
  attributes :id, :name, :customer_name, :playbook

  def playbook
    CallsPlaybookSerializer.new(object.playbook, { call_id: object.id } )
  end
end
