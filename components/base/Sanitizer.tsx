import DOMPurify from 'isomorphic-dompurify';
import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  innerHtml: string;
}
/**
 * gets the html and remove dangerous tags and attributes like script, style, onerror
 * @param innerHtml your html
 * @example ```
 * sanitize('<div>hello</div><script>alert("welcome")</script> <img src=x onerror=alert(1)>')
 * // returns <div>hello</div> <img src="x">
 * ```
 * */
export const Sanitizer = ({innerHtml,...rest}: Props) => {
  return (
    <div
      dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(innerHtml, 
        // {FORBID_TAGS: ['style']}
      )}}
      {...rest}
    />
  );
}; 

export default Sanitizer;