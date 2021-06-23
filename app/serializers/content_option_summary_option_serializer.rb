class ContentOptionSummaryOptionSerializer < ActiveModel::Serializer
  attributes :id, :content_block_id, :summary_item_id, :_destroy

  def _destroy
    '0'
  end
end
