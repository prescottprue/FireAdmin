import * as firebase from 'firebase/app'
import { runValidationForClass } from './utils/validation'
import { ACTION_TEMPLATES_COLLECTION } from './constants/firestorePaths'
import { GetOptions, throwIfNotFoundInVal, getApp } from './utils/firebase'
import { ActionTemplateValue } from './types/ActionTemplate'
export * from './types/ActionRequest'

/**
 * Fireadmin Action
 */
export default class ActionTemplate implements ActionTemplateValue {
  public path: string
  public id: string
  public ref: firebase.firestore.DocumentReference
  public listen: any
  public updatedAt?: firebase.firestore.FieldValue
  public createdAt?: firebase.firestore.FieldValue
  constructor(actionId: string, actionData?: object) {
    this.id = actionId
    this.path = `${ACTION_TEMPLATES_COLLECTION}/${actionId}`
    this.ref = getApp()
      .firestore()
      .doc(this.path)
    this.listen = this.ref.onSnapshot
    if (actionData) {
      Object.assign(this, actionData)
    }
  }
  /**
   * Validate an Action using JSON schema
   */
  public validate(actionData: ActionTemplateValue) {
    runValidationForClass(ActionTemplate, actionData)
  }
  /**
   * Get an ActionTemplate and throw if is not found
   */
  public async get(options?: GetOptions): Promise<ActionTemplate> {
    const snap = await this.ref.get()
    const projectVal = throwIfNotFoundInVal(
      snap,
      options,
      `ActionTemplate not found at path: ${this.path}`
    )
    return new ActionTemplate(this.id, projectVal)
  }

  /**
   * Update a ActionTemplate (uses JSON schema for validation)
   */
  public update(actionData: ActionTemplateValue): Promise<any> {
    this.validate(actionData)
    return this.ref.update(actionData)
  }

  public delete() {
    return this.ref.delete()
  }
}
