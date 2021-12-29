import { Inject, Injectable } from '@nestjs/common';
import { generateTopicName } from './topic-naming-utility';

const CREATE_SUFFIX = 'Create';
const CREATED_SUFFIX = 'Created';
const UPDATE_SUFFIX = 'Update';
const UPDATED_SUFFIX = 'Updated';
const DELETE_SUFFIX = 'Delete';
const DELETED_SUFFIX = 'Deleted';

@Injectable()
export class EntityChangedTopicNamingService {
  constructor(
    @Inject('DOMAIN') private domain: string,
    @Inject('ENTITY_NAME') private entityName: string
  ) {}
  generateTopicName(action: string) {
    return generateTopicName(this.domain, 'cmd', this.entityName + action);
  }

  createTopicName() {
    return this.generateTopicName(CREATE_SUFFIX);
  }

  createdTopicName() {
    return this.generateTopicName(CREATED_SUFFIX);
  }

  updateTopicName() {
    return this.generateTopicName(UPDATE_SUFFIX);
  }

  updatedTopicName() {
    return this.generateTopicName(UPDATED_SUFFIX);
  }

  removeTopicName() {
    return this.generateTopicName(DELETE_SUFFIX);
  }

  removedTopicName() {
    return this.generateTopicName(DELETED_SUFFIX);
  }
}
