class SortablePage {
  visit() {
    cy.visit('/sortable')
  }

  moveItemsIntoOrder() {
    const item = '.vertical-list-container .list-group-item'

    cy.get(item).eq(0).drag(`${item}:last`, {
      target: { position: 'bottom' },
    })
    cy.get(item).last().drag(`${item}:first`, {
      target: { position: 'top' },
    })
  }

  itemNames() {
    return cy.get('.vertical-list-container .list-group-item').then(($items) =>
      [...$items].map((element) => element.innerText.trim())
    )
  }
}

module.exports = new SortablePage()
