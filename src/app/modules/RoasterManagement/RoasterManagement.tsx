import React from 'react'
import { PageSection, Title } from '@patternfly/react-core';
import ReactBigScheduler from './ReactBigScheduler';

const RoasterManagement: React.FC = () => (
  <PageSection>
    <Title headingLevel="h1" size="lg">
      Roaster Management
    </Title>
    <ReactBigScheduler />
  </PageSection>
);
export default RoasterManagement;
