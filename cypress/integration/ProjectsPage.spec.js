import { createSelector, createIdSelector } from '../utils'

describe('Projects Page', () => {
  beforeEach(() => {
    // Login using custom token
    cy.login()
    // Go to projects page
    cy.visit('/projects', {
      onBeforeLoad(win) {
        // https://on.cypress.io/stub
        cy.stub(win.Notification, 'permission', 'granted')
        cy.stub(win, 'Notification').as('Notification')
      }
    })
  })

  describe('Add Project', () => {
    it('creates project when provided a valid name', () => {
      const newProjectTitle = 'Test project'
      cy.get(createSelector('new-project-tile')).click()
      // Type name of new project into input
      cy.get(createSelector('new-project-name'))
        .find('input')
        .type(newProjectTitle)
      // Click on the new project button
      cy.get(createSelector('new-project-create-button')).click()
      // Confirm first project tile has title passed to new project input
      cy.get(createSelector('project-tile-name'))
        .first()
        .should('have.text', newProjectTitle)
    })
  })

  describe('Delete Project', () => {
    beforeEach(() => {
      const fakeProject = {
        name: 'test delete project',
        collaborators: { [Cypress.env('TEST_UID')]: true }
      }
      cy.callFirestore('delete', 'projects')
      cy.callFirestore('set', 'projects/test-delete-project', fakeProject)
    })

    it('allows project to be deleted by project owner', () => {
      // Find tile with matching ID and click on the more button
      cy.get(createSelector('project-tile-more')).first().click()
      cy.get(createSelector('project-tile-delete')).click()
      // Confirm project tile is removed
      cy.get(createIdSelector('test-delete-project')).should('not.exist')
      cy.callFirestore('get', 'projects/test-delete-project').then(
        (deletedProject) => deletedProject === null
      )
      // Confirm project is removed from DB
      // cy.waitUntil(() =>
      //   cy
      //     .callFirestore('get', 'projects/test-delete-project')
      //     .then((deletedProject) => deletedProject === null)
      // )
    })
  })

  describe('List of Projects', () => {
    const fakeProject = {
      name: 'collab project 1',
      collaborators: { [Cypress.env('TEST_UID')]: true }
    }
    const fakeProject2 = {
      name: 'collab project 2',
      collaborators: { [Cypress.env('TEST_UID')]: true }
    }
    const ownedProject = {
      name: 'owned an collab project',
      createdBy: Cypress.env('TEST_UID'),
      collaborators: { [Cypress.env('TEST_UID')]: true }
    }
    before(() => {
      cy.callFirestore('delete', 'projects')
      cy.callFirestore('set', 'projects/collab-project-1', fakeProject)
      cy.callFirestore('set', 'projects/collab-project-2', fakeProject2)
      cy.callFirestore('set', 'projects/owned-project-1', ownedProject)
    })

    it('shows projects which are created by the current user', () => {
      // Confirm first project tile has title passed to new project input
      cy.get(createIdSelector('owned-project-1')).should('exist')
    })

    it('shows projects which have the user as a collaborator', () => {
      // Confirm first project tile has title passed to new project input
      cy.get(createIdSelector('collab-project-1')).should('exist')
      cy.get(createIdSelector('collab-project-2')).should('exist')
    })

    it('does not display the same project twice (even is creator is also collaborator)', () => {
      // Confirm collab projects are being shown (needed to prevent check before collab projects loaded)
      cy.get(createIdSelector('collab-project-1')).should('exist')
      cy.get(createSelector('project-tile-name'))
        .its('length')
        .should('equal', 3)
    })
  })
})
