(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),p:""};t.d({},{t:()=>x}),t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p,t.p;var e,n="aa9ec73b-b4d9-4065-8418-0cee1c64b5ef",r="https://mesto.nomoreparties.co/v1/wff-cohort-11/",o=function(t,e){return fetch("".concat(r,"cards"),{method:"POST",headers:{authorization:n,"Content-type":"application/json"},body:JSON.stringify({name:t,link:e})}).then((function(t){return c(t)})).then((function(t){return t}))},i=function(t){return fetch("".concat(t),{method:"HEAD"}).then((function(t){return t.ok?t:Promise.reject("Ошибка: ".concat(t.status))}))},c=function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))};function u(t){t.classList.add("popup_is-opened"),window.addEventListener("keydown",l)}function a(t){t.classList.remove("popup_is-opened"),window.removeEventListener("keydown",l)}function l(t){t.key&&"escape"===t.key.toLowerCase()&&a(document.querySelector(".popup_is-opened"))}var s=document.querySelector("#card-template").content;function p(t,o){var i=s.querySelector(".card").cloneNode(!0),a=i.querySelector(".card__image"),l=i.querySelector(".card__title"),p=i.querySelector(".card__delete-button"),d=i.querySelector(".card__like"),f=i.querySelector(".card__like-button"),m=t._id;return i.setAttribute("id",m),a.src=t.link,a.alt=t.alt,l.textContent=t.name,d.textContent=t.likes.length,function(t,e){return t.some((function(t){return t._id===e}))}(t.likes,e)&&f.classList.add("card__like-button_is-active"),t.owner._id===e?p.addEventListener("click",(function(){return e=m,n=(t=x).querySelector(".popup__form"),u(t),void n.setAttribute("id",e);var t,e,n})):p.remove(),f.addEventListener("click",(function(e){e.target.classList.contains("card__like-button_is-active")?function(t){return fetch("".concat(r,"cards/likes/").concat(t),{method:"DELETE",headers:{authorization:n,"Content-type":"application/json"}}).then((function(t){return c(t)}))}(t._id).then((function(t){d.textContent=t.likes.length,e.target.classList.remove("card__like-button_is-active")})):function(t){return fetch("".concat(r,"cards/likes/").concat(t),{method:"PUT",headers:{authorization:n,"Content-type":"application/json"}}).then((function(t){return c(t)}))}(t._id).then((function(t){e.target.classList.add("card__like-button_is-active"),d.textContent=t.likes.length}))})),a.addEventListener("click",(function(){return o(a,l)})),i}var d={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible",spanErrorSelector:"input-error"};function f(t,e,n,r,o){t.classList.add(n),t.textContent=e,r.classList.add(o)}function m(t,e,n,r){t.classList.remove(e),t.textContent="",n.classList.remove(r)}function y(t,e,n){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove(n)):(e.disabled=!0,e.classList.add(n))}function _(t,e){Array.from(t.querySelectorAll(e.inputSelector)).forEach((function(n){m(t.querySelector(".".concat(n.name,"-input-error")),e.errorClass,n,e.inputErrorClass)}))}function v(t){var e,n;"new-place"===t.target.name?(e=t.target.querySelector(".link-input-error"),n=t.target.querySelector(".popup__input_type_url")):(e=t.target.querySelector(".profile-url-input-error"),n=t.target.querySelector(".popup__input_type_profile-url")),f(e,"Вставьте ссылку на изображение",d.errorClass,n,d.inputErrorClass)}function h(t){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},h(t)}var S,b=document.querySelector(".places__list"),C=document.querySelector(".popup_type_edit"),E=document.querySelector(".popup_type_new-card"),k=document.querySelector(".popup_type_image"),q=document.querySelector(".popup_type_profile_edit"),g=k.querySelector("#popup-image"),L=k.querySelector("#popup-description"),w=document.querySelector(".profile__image"),x=document.querySelector(".popup_type_card-remove"),j=document.querySelector(".profile__edit-button"),A=document.querySelector(".profile__add-button"),P=document.querySelectorAll(".popup__close"),T=document.querySelectorAll(".popup"),z=document.forms["edit-profile"],O=document.forms["new-place"],B=document.forms["edit-profile-avatar"],D=document.querySelector(".profile__title"),V=document.querySelector(".profile__description"),N=document.forms["card-remove"];function H(t){b.prepend(t)}function J(t){t.submitter.textContent="Сохранение..."}function M(t){t.submitter.textContent="Сохранить"}function G(t){t.reset()}function I(t,e){g.src="",g.alt="",L.textContent="",g.src=t.src,g.alt=e.textContent,L.textContent=e.textContent,u(k)}j.addEventListener("click",(function(){G(z),u(C),_(z,d)})),w.addEventListener("click",(function(){G(B),u(q),_(B,d)})),A.addEventListener("click",(function(){G(O),u(E),_(O,d)})),P.forEach((function(t){var e=t.closest(".popup");t.addEventListener("click",(function(){return a(e)}))})),T.forEach((function(t){t.addEventListener("click",(function(e){return function(t,e){t.target.classList.contains("popup")&&a(e)}(e,t)}))})),O.addEventListener("submit",(function(t){return function(t,e,n,r){t.preventDefault();var o=O.elements["place-name"].value,c=O.elements.link.value,u=O.elements[2];J(t),i(c).then((function(){return r(o,c)})).then((function(t){var r,i,u,l,s={name:o,link:c,alt:o,_id:t._id,owner:(r={},i="_id",u=t.owner._id,l=function(t,e){if("object"!=h(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!=h(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(i),(i="symbol"==h(l)?l:String(l))in r?Object.defineProperty(r,i,{value:u,enumerable:!0,configurable:!0,writable:!0}):r[i]=u,r),likes:t.likes||[]};n(e(s,I)),a(E),G(O)})).finally((function(){return M(t)})).catch((function(){return v(t)})),y([O.elements["place-name"],O.elements.link],u,d.inactiveButtonClass)}(t,p,H,o)})),z.addEventListener("submit",(function(t){t.preventDefault();var e,o,i=z.elements.name.value,c=z.elements.description.value;J(t),D.textContent=i,V.textContent=c,z.elements.name.defaultValue=D.textContent,z.elements.description.defaultValue=V.textContent,(e=i,o=c,fetch("".concat(r,"users/me"),{method:"PATCH",headers:{authorization:n,"Content-type":"application/json"},body:JSON.stringify({name:e,about:o})})).then((function(){return a(C)})).finally((function(){return M(t)}))})),B.addEventListener("submit",(function(t){return function(t){t.preventDefault();var e=B.elements["profile-url"].value;J(t),i(e).then((function(){var o;(o=e,fetch("".concat(r,"users/me/avatar"),{method:"PATCH",headers:{authorization:n,"Content-type":"application/json"},body:JSON.stringify({avatar:o})}).then((function(t){return c(t)})).catch((function(t){throw t}))).then((function(){w.style["background-image"]="url('".concat(e,"')"),a(q),G(B)})).catch((function(){return v(t)}))})).catch((function(t){return console.log(t)}),v(t)).finally((function(){return M(t)}))}(t)})),N.addEventListener("submit",(function(t){return function(t){t.preventDefault();var e,o=t.target.id,i=document.getElementById(o);(e=o,fetch("".concat(r,"cards/").concat(e),{method:"DELETE",headers:{authorization:n}})).then((function(){i.remove(),a(x)}))}(t)})),S=d,Array.from(document.querySelectorAll(S.formSelector)).forEach((function(t){return function(t,e){var n=t.querySelector(e.submitButtonSelector),r=e.errorClass,o=Array.from(t.querySelectorAll(e.inputSelector));y(o,n,e.inactiveButtonClass),o.forEach((function(i){i.addEventListener("input",(function(){!function(t,e,n,r,o){var i=t.querySelector(".".concat(e.name,"-").concat(o));e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?0==e.value?f(i,"Строка не может состоять из одних пробелов",n,e,r):m(i,n,e,r):f(i,e.validationMessage,n,e,r)}(t,i,r,e.inputErrorClass,e.spanErrorSelector),y(o,n,e.inactiveButtonClass)}))}))}(t,S)}));var U=[function(){fetch("".concat(r,"users/me"),{method:"GET",headers:{authorization:n}}).then((function(t){return c(t)})).then((function(t){return n=t._id,e=n,t;var n})).then((function(t){D.textContent=t.name,V.textContent=t.about,w.style["background-image"]='url("'.concat(t.avatar,'")'),z.elements.name.defaultValue=t.name,z.elements.description.defaultValue=t.about}))},function(){fetch("".concat(r,"cards"),{method:"GET",headers:{authorization:n}}).then((function(t){return c(t)})).then((function(t){t.forEach((function(t){return H(p(t,I))}))}))}];Promise.all(U).then((function(t){return t.forEach((function(t){return t()}))}))})();