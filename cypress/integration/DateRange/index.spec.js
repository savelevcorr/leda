/* eslint-disable no-unused-expressions,jest/valid-expect */
import { defaultAutoCompleteTheme as theme } from '../../../leda/components/AutoComplete/theme';

describe('DateRange', () => {
  let lastConsole
  let stub
  before(() => {
    cy.visit('http://localhost:9000/cypress/daterange')
  })
  it('Delimiter', () => {
    cy.name('firstDatePicker')
      .parents('div.demo-story')
      .parent()
      .find('.daterange-delimiter')
      .should('have.length', 6)
  })
  
  it('MinMaxTest', () => {
    cy.name('MinMaxDatePicker-from')
      .parent()
      .parent()
      .find('.calendar-prev-button i')
      .click()
      .click()
      .parents('.calendar-wrapper.visible')
      .find('div.calendar-date-cell[title="13 апреля 2012"]')
      .click()
      .parent()
      .find('div.calendar-date-cell[title="12 апреля 2012"]')
      .click()
      .name('MinMaxDatePicker-from')
      .should('have.value', '12.04.2012')
      .name('MinMaxDatePicker-to')
      .parent()
      .parent()
      .find('.calendar-prev-button')
      .click()
      .click()
      .parents('.calendar-wrapper.visible')
      .find('div.calendar-date-cell.disabled-date')
      .contains('11')
      .should('exist')
      .parents('.calendar-wrapper.visible')
      .find('div.calendar-date-cell.disabled-date')
      .should('have.length', 19)
      .name('MinMaxDatePicker-to')
      .parent()
      .parent()
      .find('div.calendar-date-cell[title="25 апреля 2012"]')
      .click()
      .parent()
      .find('div.calendar-date-cell[title="26 апреля 2012"]')
      .click()
      .name('MinMaxDatePicker-from')
      .parent()
      .parent()
      .find('div.calendar-date-cell.disabled-date')
      .contains('27')
      .should('be.exist')
      .parents('.calendar-wrapper.visible')
      .find('div.calendar-date-cell.disabled-date')
      .should('have.length', 18)
  })

  describe('States', () => {
    it('should be disabled when isDisabled', () => {
      cy.name('firstDatePicker')
        .should('be.disabled')
        .should('have.attr', 'disabled')
        .name('disabledCalendar-from')
        .should('be.disabled')
        .should('have.attr', 'disabled')
        .name('disabledCalendar-to')
        .should('be.disabled')
        .should('have.attr', 'disabled')
    })

    it('should be open when isOpen', () => {
      cy.name('MinMaxDatePicker-to')
        .parents()
        .children('.calendar-wrapper')
        .should('be.visible')
        .name('MinMaxDatePicker-from')
        .parents()
        .children('.calendar-wrapper')
        .should('be.visible')
    })

    it('should be required when isRequired', () => {
      cy.name('ThirdDateRange-to')
        .should('have.attr', 'aria-required', 'true')
        .name('ThirdDateRange-from')
        .should('have.attr', 'aria-required', 'true')
        .name('secondDatePicker')
        .should('have.attr', 'aria-required', 'true')
        .focus()
        .blur()
        .parent()
        .should('have.class', 'danger')
      })
  })
  
  describe('Display', () => {
    it('Placeholders', () => {
      cy.name('firstDatePicker')
        .should('have.attr', 'placeholder', 'Type your date...')
        .name('secondDatePicker')
        .should('have.attr', 'placeholder', 'Type something...')
        .name('MinMaxDatePickerOpened-to')
        .should('have.attr', 'placeholder', 'Type your date...')
    })
    
    it('Values', () => {
      cy.name('openedCalendar-to')
      .should('have.attr', 'value', '11-е число  22-го месяца  33__-го года')
    })
  })

})