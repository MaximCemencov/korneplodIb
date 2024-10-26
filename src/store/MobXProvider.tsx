import React, { ReactNode } from 'react';
import { Observer } from 'mobx-react';

interface MobXProviderProps {
    children: ReactNode;
}

const MobXProvider: React.FC<MobXProviderProps> = ({ children }) => {
    return (
        <Observer>
            {() => (
                <div>
                    {children}
                </div>
            )}
        </Observer>
    );
};

export default MobXProvider;