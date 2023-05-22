import React from 'react';

const Layout = (props: any) => (
  <section className="vh-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div
            className={'card ' + props.backgroundColor + ' text-white'}
            style={{ borderRadius: '1rem' }}
          >
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <div
                  style={{
                    display: 'inline-flex',
                    maxWidth: '100%',
                    width: '100%',
                  }}
                >
                  <h2 className="fw-bold mb-2 text-uppercase">
                    Pocket-Bank
                  </h2>
                  <button
                    className={'btn btn-sm'}
                    onClick={props.buttonClick}
                    style={{
                      background: props.buttonBackground,
                      alignSelf: 'center',
                      marginLeft: '25%',
                    }}
                  >
                    {props.buttonTitle}
                  </button>
                </div>
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Layout;
