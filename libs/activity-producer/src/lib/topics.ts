import {generateTopicName} from "@kryptand/messaging/kafka-management";

export const INITIAL_ACTIVITY_TOPIC_NAME = generateTopicName(
  'activity',
  'fct',
  'initial'
);
export const GENERAL_ACTIVITY_TOPIC_NAME = generateTopicName(
  'activity',
  'fct',
  'general'
);
