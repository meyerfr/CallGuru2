export const getPrevSectionId = (currentSectionId, sections) => {
  const allSectionIds = sections.map(s => s.id);
  const currentSectionIdIdx = allSectionIds.indexOf(currentSectionId);
  const prevSectionIdIdx = currentSectionIdIdx - 1 < 0 ? 0 : currentSectionIdIdx - 1;
  const prevSectionId = sections[prevSectionIdIdx].id;
  return prevSectionId;
}

export const getNextSectionId = (currentSectionId, sections) => {
  const allSectionIds = sections.map(s => s.id);
  const currentSectionIdIdx = allSectionIds.indexOf(currentSectionId);
  const nextSectionIdIdx = Math.min(allSectionIds.length - 1, currentSectionIdIdx + 1);
  const nextSectionId = sections[nextSectionIdIdx].id;
  return nextSectionId;
}

export const startCall = (playbookId, createCall, history) => {
  createCall(playbookId)
  .then((r) => {
    history.push(`/calls/${r.payload.id}/playbooks/${playbookId}/sections/${r.payload.playbook.sections[0].id}`)
  })
}
