import React from 'react';
import { Offline, Online } from 'react-detect-offline';
export default function OnOffLineUser() {
    return (
        <div>
              <Online>
                <div>You are online</div>
            </Online>
            <Offline>You are currently offline!</Offline>
        </div>
    )
}
